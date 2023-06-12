package es.urjc.code.juegosenred;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Usuario {

private WebSocketSession wss; 			// id WS session
	
	private String name;
	
	public Usuario(WebSocketSession wss, String name){
		this.wss = wss;
		this.name = name;
	}
	
	public Boolean equals(WebSocketSession ws) {
		return this.wss.getId().equals(ws.getId());
	}
	
	public String getName() {
		return name;
	}
	
	public String getWss() {
		return wss.getId();
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void send(TextMessage textMessage) throws IOException{
		this.wss.sendMessage(textMessage);
	}


}
