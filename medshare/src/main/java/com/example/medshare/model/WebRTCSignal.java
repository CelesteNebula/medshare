package com.example.medshare.model;

public class WebRTCSignal {
    private String type; // 消息类型：offer、answer或candidate
    private String destination; // 消息目标用户的标识符
    private String content; // SDP信息或ICE候选人信息

    // 构造函数
    public WebRTCSignal(String type, String destination, String content) {
        this.type = type;
        this.destination = destination;
        this.content = content;
    }

    // Getter和Setter
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
