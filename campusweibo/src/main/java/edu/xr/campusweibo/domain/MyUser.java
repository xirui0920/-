package edu.xr.campusweibo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.xr.campusweibo.config.Constants;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * Created by xirui on 2017/4/23.
 */
@Entity
@Table(name = "w_user")
public class MyUser implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(length = 50, unique = true, nullable = false)
    private String schoolcode;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(length = 60, nullable = false)
    private String password;

    @Size(max = 50)
    @NotNull
    @Column(length = 50, unique = true, nullable = false)
    private String nickname;


    @Size(max = 256)
    @Column(length = 256)
    private String imageUrl;

    @Size(max=4)
    @Column(length = 4)
    private String sex;

    @Size(max = 16)
    @Column(length = 16)
    private String school;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSchoolcode() {
        return schoolcode;
    }

    public void setSchoolcode(String schoolcode) {
        this.schoolcode = schoolcode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MyUser myUser = (MyUser) o;

        if (id != null ? !id.equals(myUser.id) : myUser.id != null) return false;
        if (schoolcode != null ? !schoolcode.equals(myUser.schoolcode) : myUser.schoolcode != null) return false;
        if (password != null ? !password.equals(myUser.password) : myUser.password != null) return false;
        if (nickname != null ? !nickname.equals(myUser.nickname) : myUser.nickname != null) return false;
        if (imageUrl != null ? !imageUrl.equals(myUser.imageUrl) : myUser.imageUrl != null) return false;
        if (sex != null ? !sex.equals(myUser.sex) : myUser.sex != null) return false;
        return school != null ? school.equals(myUser.school) : myUser.school == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (schoolcode != null ? schoolcode.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (nickname != null ? nickname.hashCode() : 0);
        result = 31 * result + (imageUrl != null ? imageUrl.hashCode() : 0);
        result = 31 * result + (sex != null ? sex.hashCode() : 0);
        result = 31 * result + (school != null ? school.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "MyUser{" +
            "id=" + id +
            ", schoolcode='" + schoolcode + '\'' +
            ", password='" + password + '\'' +
            ", nickname='" + nickname + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", sex='" + sex + '\'' +
            ", school='" + school + '\'' +
            '}';
    }
}
