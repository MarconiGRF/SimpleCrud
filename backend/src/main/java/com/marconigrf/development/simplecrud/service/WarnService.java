package com.marconigrf.development.simplecrud.service;

import com.marconigrf.development.simplecrud.entity.Warn;
import com.marconigrf.development.simplecrud.exception.ServiceException;
import com.marconigrf.development.simplecrud.repository.WarnRepository;
import com.marconigrf.development.simplecrud.util.ObjectValidator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.util.Optional.ofNullable;

/**
 * The service class that handles the business logic for the {@link Warn} entity operations.
 *
 * @author Marconi Gomes (mgrf@cin.ufpe.br)
 */
@Service
public class WarnService implements IWarnService {

    private final WarnRepository repository;

    public WarnService(WarnRepository repository) {
        this.repository = repository;
    }

    /**
     * Gets a page of the available Warns.
     *
     * @return The page of available warns.
     */
    public Page<Warn> getAll(Integer page, Integer pageSize) {
        try {
            Pageable pageable = this.buildPageable(page, pageSize);
            return this.repository.findAll(pageable);
        } catch (Exception ex) {
            throw new ServiceException(ex);
        }
    }

    /**
     * Gets a Warn by its Id.
     * @param warnId - The ID of the Warn to be searched.
     * @return The Warn if found.
     */
    public Warn getById(UUID warnId) {
        try {
            Optional<Warn> warn = this.repository.findById(warnId);
            if (warn.isPresent()) {
                return warn.get();
            } else {
                return null;
            }
        } catch (Exception ex) {
            throw new ServiceException(ex);
        }
    }

    /**
     * Builds and returns a {@link Pageable} for the given parameters.
     * @param page - The page number.
     * @param pageSize - The page size.
     * @return A Pageable.
     */
    private Pageable buildPageable(Integer page, Integer pageSize) {
        Sort pageSort = Sort.by(Sort.Direction.ASC, "publishedAt");
        return PageRequest.of(page, pageSize, pageSort);
    }

    /**
     * Creates a Warn entry on the system.
     * @param warn The object to be saved.
     * @return The Warn if operation is succeeded.
     */
    public Warn create(Warn warn) {
        try {
            if (ObjectValidator.isValid(warn)) {
                warn.setPublishedAt(System.currentTimeMillis());
                repository.save(warn);
            } else {
                throw new ServiceException("Object is not a valid Warn!");
            }

            return warn;
        } catch (Exception ex) {
            throw new ServiceException(ex);
        }
    }

    /**
     * Updates an existing warn by its ID with the information contained on the given VO.
     * @param warnData The information to update the entity with.
     * @return True if the update operation was successful, false otherwise.
     */
    public Boolean update(Warn warnData) {
        try {
            if (ObjectValidator.isValid(warnData)) {
                Optional<Warn> entity = repository.findById(warnData.getId());
                if (entity.isEmpty()) {
                    throw new ServiceException("Warn not found!");
                }
                Warn actualWarn = entity.get();
                ofNullable(warnData.getTitle()).ifPresent(actualWarn::setTitle);
                ofNullable(warnData.getDescription()).ifPresent(actualWarn::setDescription);
                ofNullable(warnData.getViewedAt()).ifPresent(actualWarn::setViewedAt);

                repository.save(actualWarn);
                return true;
            } else {
                throw new ServiceException("Object is not a valid warn VO!");
            }
        } catch (Exception ex) {
            throw new ServiceException(ex);
        }
    }

    /**
     * Updates an existing warn viewed property by its ID with the current moment.
     * @param warnId The information to update the entity with.
     * @return The updated warn if operation was succeeded.
     */
    public Warn updateViewedAt(UUID warnId) {
        try {
            Optional<Warn> entity = repository.findById(warnId);
            if (entity.isEmpty()) {
                throw new ServiceException("Warn not found!");
            }

            Warn actualWarn = entity.get();
            if (Objects.isNull(actualWarn.getViewedAt())) {
                actualWarn.setViewedAt(System.currentTimeMillis());
            }
            repository.save(actualWarn);

            return actualWarn;
        } catch (Exception ex) {
            throw new ServiceException(ex);
        }
    }

    /**
     * Deletes an existing warn by its ID.
     * @param warnId The ID of the warm to be deleted.
     * @return True if the deletion operation was successful, false otherwise.
     */
    public Boolean delete(UUID warnId) {
        try {
            boolean exists = repository.existsById(warnId);
            if (exists) {
                repository.deleteById(warnId);
                return true;
            } else {
                throw new ServiceException("Warn could not be deleted because it was not found!");
            }
        } catch (Exception ex) {
            throw new ServiceException(ex);
        }
    }
}
