package es.urjc.code.juegosenred;

import java.io.IOException;
import java.util.Random;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class Lobby {

	// Definimos las constantes de la clave
	final private String KEYSET = "ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789";
	final private int KEYSIZE = 8;

	private ObjectMapper mapper = new ObjectMapper();

	String id;

	Usuario red;
	Usuario blue;

	Boolean redP = false, blueP = false;

	public Lobby() {
		this.id = generate_Id();

		System.out.println("Lobby creado: " + id);
	}

	public void addUsuario(Usuario p) {
		if (!this.isFull()) {
			if (red == null)
				red = p;
			else if (blue == null)
				blue = p;
		}
	}

	public void checkGameStart() throws IOException {
		if (this.blue != null && this.red != null) {
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("type", "start");
			newNode.put("body", "alfredo");
			System.out.println("EMPEZAMOS LA PARTIDA");
			TextMessage out = new TextMessage(newNode.toString());
			red.send(out);
			blue.send(out);

			this.blueP = false;
			this.redP = false;
		}
	}

	public void handleMessage(TextMessage message, String session) throws IOException {
		JsonNode node = mapper.readTree(message.getPayload());

		// System.out.println(node.toString());

		if (node.get("type").asText().equals("picked")) {
			if (node.get("body").asText().equals("red")) {
				System.out.println("Rojo pickeado");
				redP = true;
			} else {
				System.out.println("Azul pickeado");
				blueP = true;
			}
			checkGameStart();
		} else if (red != null && !red.getWss().equals(session)) {
			// System.out.println("Mandando a ROJO");
			this.red.send(message);
		} else if (blue != null && !blue.getWss().equals(session)) {
			// System.out.println("Mandando a AZUL");
			this.blue.send(message);
		}

	}

	public void remove(WebSocketSession session) {
		if (this.red != null && this.red.equals(session)) {
			this.red = null;
		}

		if (this.blue != null && this.blue.equals(session)) {
			this.blue = null;
		}
	}

	private String generate_Id() {
		String out = "";
		Random r = new Random();

		for (int i = 0; i < KEYSIZE - 1; i++) {
			out += KEYSET.charAt(r.nextInt(KEYSET.length()));
		}

		return out;
	}

	public String getColor(Usuario p) {
		if (this.red.equals(p)) {
			return "red";
		} else if (this.blue.equals(p)) {
			return "blue";
		} else {
			return "undefined";
		}
	}

	public Boolean isFull() {
		if (this.red != null && this.blue != null)
			return true;
		else
			return false;
	}

	public Boolean isEmpty() {
		if (this.red == null && this.blue == null)
			return true;
		else
			return false;
	}

	public Boolean hasRoom(Usuario p) {
		if (this.isFull()) {
			return false;
		} else if (this.red == null) {
			this.red = p;
			return true;
		} else if (this.blue == null) {
			this.blue = p;
			return true;
		} else {
			return false;
		}
	}
}
