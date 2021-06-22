package com.marconigrf.development.simplecrud.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Error's Value Object.
 * It is intended to store messages about an exception.
 *
 * @author Marconi Gomes (mgrf@cin.ufpe.br)
 */
public class ErrorVO {

    @JsonProperty("message")
    private String message;

    public ErrorVO(String message) {
        this.message = message;
    }
}
