package com.marconigrf.development.simplecrud.util;

import com.marconigrf.development.simplecrud.entity.Warn;
import com.marconigrf.development.simplecrud.vo.WarnVO;

import java.util.Objects;

/**
 * A validator class to validate the fields of an Entity or VO instance.
 *
 * @author Marconi Gomes (mgrf@cin.ufpe.br)
 */
public class ObjectValidator {
    /**
     * Checks if a {@link WarnVO} is considered valid when it has no blank nor null fields.
     * @param warnVO The Warn VO to be checked if is valid.
     * @return True if the VO is valid, false otherwise.
     * @throws Exception When a get of some field produces an error.
     */
    public static Boolean isValid(WarnVO warnVO) throws Exception {
        try {
            boolean isValid = true;
            isValid &= !warnVO.getTitle().isBlank();
            isValid &= !warnVO.getDescription().isBlank();
            isValid &= Objects.nonNull(warnVO.getPublishedAt());

            return isValid;
        } catch (Exception ex) {
            throw new Exception("Object is not a valid WarnVO!");
        }
    }

    /**
     * Checks if a {@link Warn} is considered valid when it has no blank nor null fields.
     * @param warn The Warn VO to be checked if is valid.
     * @return True if the VO is valid, false otherwise.
     * @throws Exception When a get of some field produces an error.
     */
    public static Boolean isValid(Warn warn) throws Exception {
        try {
            boolean isValid = true;
            isValid &= !warn.getTitle().isBlank();
            isValid &= !warn.getDescription().isBlank();
            return isValid;
        } catch (Exception ex) {
            throw new Exception("Object is not a valid Warn!");
        }
    }
}
