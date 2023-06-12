package es.urjc.code.juegosenred;

import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketGameHandler extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	private Map<String, Lobby> lobbys = new ConcurrentHashMap<>();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		String in = session.getId();
		System.out.println("New session: " + in);
		sessions.put(session.getId(), session);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		removeUsuario(session);
		sessions.remove(session.getId());
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());

		JsonNode node = mapper.readTree(message.getPayload());
		if (node.has("type") && node.get("type").asText().equals("endgame")) {
			JsonNode body = node.get("body");

			// Verifica que el mensaje tenga la propiedad "endGame" y que sea true
			if (body.has("endGame") && body.get("endGame").asBoolean()) {
				//clearLobby(session.getId());
				removeUsuario(session);
				return;
			}
		}

		if (!sendToLobby(session, message)) {
			System.out.println("Mensaje de una persona sin lobby, lo a�adimos");
			Lobby autoSelected = getLobby(session, message);
			lobbys.put(session.getId(), autoSelected);
			if (autoSelected.isFull())
				autoSelected.checkGameStart();
		}
		// sendOtherParticipants(session, message.getPayload());

	}

	private void sendColor(WebSocketSession session, Lobby l, Usuario p) throws IOException {
		String msg = l.getColor(p);

		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("type", "side");
		newNode.put("body", msg);

		session.sendMessage(new TextMessage(newNode.toString()));

	}

	private Lobby getLobby(WebSocketSession session, TextMessage message) throws IOException {
		JsonNode node = mapper.readTree(message.getPayload());

		Usuario p = new Usuario(session, node.get("body").asText());
		for (Entry<String, Lobby> ses : lobbys.entrySet()) {
			if (ses.getValue().hasRoom(p)) {
				System.out.println("Encontrado Lobby con un hueco");

				sendColor(session, ses.getValue(), p);

				return ses.getValue();
			}
		}
		System.out.println("No lobbys libres, creamos uno");
		Lobby l = new Lobby();
		l.hasRoom(p);

		sendColor(session, l, p);

		return l;
	}

	private boolean sendToLobby(WebSocketSession session, TextMessage message) throws IOException {
		for (Entry<String, Lobby> ses : lobbys.entrySet()) {
			if (ses.getKey().equals(session.getId())) {
				ses.getValue().handleMessage(message, session.getId());
				return true;
			}
		}
		return false;
	}

	private void removeUsuario(WebSocketSession session) {
		for (Entry<String, Lobby> ses : lobbys.entrySet()) {
			if (ses.getKey().equals(session.getId())) {
				ses.getValue().remove(session);
				this.lobbys.remove(ses.getKey());
			}
		}

	}

	// OLD
	private void sendOtherParticipants(WebSocketSession session, String payload) throws IOException {
		for (WebSocketSession participant : sessions.values()) {
			if (participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(payload));
			}
		}
	}

}
