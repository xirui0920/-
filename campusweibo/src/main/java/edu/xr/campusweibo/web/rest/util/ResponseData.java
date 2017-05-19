package edu.xr.campusweibo.web.rest.util;

/**
 * Created by xirui on 2017/4/25.
 */

/**
 * 接口返回结果封装
 */
public class ResponseData<T> extends ResponseResult {

    private T data;

    public ResponseData(int returnCode, String returnInfo, T data) {
        super(returnCode, returnInfo);
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
