package com.sogoodlabs.flashcardsapp.model.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class WordDef {

    @Id
    private String id;

    private String definition;

    @ManyToOne(fetch = FetchType.LAZY)
    private Word word;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }
}
