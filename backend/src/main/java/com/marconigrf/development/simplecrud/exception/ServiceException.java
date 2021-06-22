package com.marconigrf.development.simplecrud.exception;

/**
 * The Service Exception class.
 * It is meant to be thrown when an error occurs on service layer.
 *
 * @author Marconi Gomes (mgrf@cin.ufpe.br)
 */
public class ServiceException extends RuntimeException {
    public ServiceException(String msg) { super(msg); }

    public ServiceException(Exception ex) { super(ex); }
}
