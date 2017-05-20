package edu.xr.campusweibo.service.dto;

import edu.xr.campusweibo.domain.Weibo;

import java.io.Serializable;

/**
 * Created by xirui on 2017/5/20.
 */
public class WeiboDTO implements Serializable{

    private Weibo weibo;

    private String nickname;

    public WeiboDTO(Weibo weibo,String nickname){
        this.weibo = weibo;
        this.nickname = nickname;
    }

    public Weibo getWeibo() {
        return weibo;
    }

    public void setWeibo(Weibo weibo) {
        this.weibo = weibo;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Override
    public String toString() {
        return "WeiboDTO{" +
            "weibo=" + weibo +
            ", nickname='" + nickname + '\'' +
            '}';
    }
}
