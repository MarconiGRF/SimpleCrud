package com.marconigrf.development.simplecrud.repository;

import com.marconigrf.development.simplecrud.entity.Warn;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * The repository class that handles all the Data Access Logic for the {@link Warn} entity and its operations.
 *
 * @author Marconi Gomes (mgrf@cin.ufpe.br)
 */
@Repository
public interface WarnRepository extends CrudRepository<Warn, UUID> {

}

