package com.marconigrf.development.simplecrud.util;

import com.marconigrf.development.simplecrud.entity.Warn;
import com.marconigrf.development.simplecrud.vo.WarnVO;

/**
 * An utility class to convert objects between Entities and VOs.
 *
 * @author Marconi Gomes (mgrf@cin.ufpe.br)
 */
public class ObjectConverter {
    /**
     * Converts a {@link Warn} instance into a {@link WarnVO}.
     * @param warn The warn to be converted to VO.
     * @return A WanVO converted from the original object.
     */
    public static WarnVO toVO(Warn warn) {
        WarnVO warnVO = new WarnVO();
        warnVO.setId(warn.getId());
        warnVO.setTitle(warn.getTitle());
        warnVO.setDescription(warn.getDescription());
        warnVO.setPublishedAt(warn.getPublishedAt());
        warnVO.setViewedAt(warn.getViewedAt());

        return warnVO;
    }

    /**
     * Converts a {@link WarnVO} instance into a {@link Warn}.
     * @param warnVO The warn VO to be converted to Entity.
     * @return A Warn converted from the original object.
     */
    public static Warn toEntity(WarnVO warnVO) {
        Warn warn = new Warn();
        warn.setId(warnVO.getId());
        warn.setTitle(warnVO.getTitle());
        warn.setDescription(warnVO.getDescription());
        warn.setPublishedAt(warnVO.getPublishedAt());
        warn.setViewedAt(warnVO.getViewedAt());

        return warn;
    }
}
