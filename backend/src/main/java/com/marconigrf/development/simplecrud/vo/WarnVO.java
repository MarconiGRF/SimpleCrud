package com.marconigrf.development.simplecrud.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.UUID;

/**
 * Warn Value Object.
 */
public class WarnVO {

    @JsonProperty("id")
    private UUID id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("publishedAt")
    private Long publishedAt;

    @JsonProperty("viewedAt")
    private Long viewedAt;

    public WarnVO () {}

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

