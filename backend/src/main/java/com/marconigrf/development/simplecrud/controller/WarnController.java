package com.marconigrf.development.simplecrud.controller;

import com.marconigrf.development.simplecrud.entity.Warn;
import com.marconigrf.development.simplecrud.exception.ServiceException;
import com.marconigrf.development.simplecrud.service.WarnService;
import com.marconigrf.development.simplecrud.util.ObjectConverter;
import com.marconigrf.development.simplecrud.vo.ErrorVO;
import com.marconigrf.development.simplecrud.vo.WarnVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * The REST controller class that handles all request handling and mapping for the {@link Warn} entity and its operations.
 *
 * @author Marconi Gomes (mgrf@cin.ufpe.br)
 */
@RestController
@RequestMapping("/warns")
@CrossOrigin
public class WarnController {

    private final WarnService warnService;

    public WarnController(WarnService warnService) {
        this.warnService = warnService;
    }

    /**
     * Gets all the available warns for a page on system triggered by a GET Request.
     *
     * @return A response entity containing a {@link Page} of {@link Warn}s.
     */
    @GetMapping
    public ResponseEntity getAll(@RequestParam(required = false, defaultValue = "0") Integer page,
                                 @RequestParam(required = false, defaultValue = "5") Integer pageSize) {
        try {
            Page<Warn> warns = warnService.getAll(page, pageSize);
            return new ResponseEntity<>(warns, HttpStatus.OK);
        } catch (ServiceException se) {
            return exceptionHandler(se);
        }
    }

    /**
     * Creates a new Warn based on the given {@link WarnVO}.
     * It is triggered on POST requests with a body that matches a {@link WarnVO}.
     *
     * @param warnVO The Warn VO containing the information of a warn.
     * @return True if the operation was successful, False otherwise.
     */
    @PostMapping
    public ResponseEntity create(@RequestBody WarnVO warnVO) {
        try {
            Warn warn = ObjectConverter.toEntity(warnVO);
            Boolean result = warnService.create(warn);

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (ServiceException se) {
            return exceptionHandler(se);
        }
    }

    /**
     * Updates an existing Warn with the information on the given {@link WarnVO}.
     * @param warnVO The Warn VO containing the information of a Warn to be updated.
     * @return True if the operation was successful, false otherwise.
     */
    @PutMapping
    public ResponseEntity update(@RequestBody WarnVO warnVO) {
        try {
            Warn warn = ObjectConverter.toEntity(warnVO);
            Boolean result = warnService.update(warn);

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (ServiceException se) {
            return exceptionHandler(se);
        }
    }

    /**
     * Updates an existing Warn viewedAt with the current moment.
     * @param warnId The ID of the warning to be updated.
     * @return The updated warn if operation was succeeded.
     */
    @PutMapping("/{warnId}")
    public ResponseEntity updateViewedAt(@PathVariable UUID warnId) {
        try {
            Warn result = warnService.updateViewedAt(warnId);
            WarnVO resultVO = ObjectConverter.toVO(result);
            return new ResponseEntity<>(resultVO, HttpStatus.OK);
        } catch (ServiceException se) {
            return exceptionHandler(se);
        }
    }

    /**
     * Deletes an existing Warn by its ID.
     * @param warnId The ID of the warning to be deleted.
     * @return True if the operation was successful, false otherwise.
     */
    @DeleteMapping("/{warnId}")
    public ResponseEntity delete(@PathVariable UUID warnId) {
        try {
            Boolean result = warnService.delete(warnId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (ServiceException se) {
            return exceptionHandler(se);
        }
    }

    /**
     * Handles an exception by getting its cause message, encapsulating it into a {@link ErrorVO} and returning it.
     * @param exception The exception to be handled.
     * @return A ResponseEntity containing the error message from the exception.
     */
    public ResponseEntity<ErrorVO> exceptionHandler(Exception exception) {
        String cause = exception.getMessage();
        return new ResponseEntity<>(new ErrorVO(cause), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
