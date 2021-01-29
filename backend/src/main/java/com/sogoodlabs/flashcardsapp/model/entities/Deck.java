package com.sogoodlabs.flashcardsapp.model.entities;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Deck {

    @Id
    private String id;

    private String title;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
