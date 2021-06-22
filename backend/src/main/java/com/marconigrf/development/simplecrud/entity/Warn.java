package com.marconigrf.development.simplecrud.entity;

import javax.persistence.*;
import java.util.UUID;

/**
 * This class describes the Warn entity.
 *
 * @author Marconi Gomes (mgrf@cin.ufpe.br)
 */
@Entity
@Table(name = "warns")
public class Warn {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String title;

    private String description;

    private Long publishedAt;

    private Long viewedAt;

    public Warn () {}

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Long getPublishedAt() {
        return publishedAt;
    }

    public Long getViewedAt() {
        return viewedAt;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setViewedAt(Long viewedAt) {
        this.viewedAt = viewedAt;
    }

    public void setPublishedAt(Long publishedAt) {
        this.publishedAt = publishedAt;
    }
}
