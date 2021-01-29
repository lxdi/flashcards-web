package com.sogoodlabs.flashcardsapp.model.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Word {

    @Id
    private String id;

    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    private Deck deck;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
