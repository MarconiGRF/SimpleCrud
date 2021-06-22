package com.marconigrf.development.simplecrud.service;

import com.marconigrf.development.simplecrud.entity.Warn;

import java.util.List;
import java.util.UUID;

/**
 * An interface for defining all the methods that {@link Warn} Service must implement.
 */
public interface IWarnService {
    List<Warn> getAll();

    Boolean create(Warn warn);

    Boolean update(Warn warn);

    Boolean delete(UUID id);
}
