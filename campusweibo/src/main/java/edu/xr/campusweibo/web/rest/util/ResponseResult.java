package edu.xr.campusweibo.web.rest.util;

import java.io.Serializable;

/**
 * Created by xirui on 2017/4/26.
 */
public class ResponseResult implements Serializable {
    /**
     * 返回结果码 0成功，非0失败
     */
    private int returnCode = 0;
    /**
     * 返回操作结果信息
     */
    private String returnInfo;

    public ResponseResult() {
    }

    public ResponseResult(int returnCode, String returnInfo) {
        this.returnCode = returnCode;
        this.returnInfo = returnInfo;
    }

    public int getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(int returnCode) {
        this.returnCode = returnCode;
    }

    public String getReturnInfo() {
        return returnInfo;
    }

    public void setReturnInfo(String returnInfo) {
        this.returnInfo = returnInfo;
    }
}
