package es.urjc.code.juegosenred;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class RestEjer1ConUiApplication implements WebSocketConfigurer{

	public static void main(String[] args) {
		SpringApplication.run(RestEjer1ConUiApplication.class, args);
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(gameHandler(), "/game").setAllowedOrigins("*");
		
	}
	
	@Bean
	public WebsocketGameHandler gameHandler() {
		return new WebsocketGameHandler();
	}
}
