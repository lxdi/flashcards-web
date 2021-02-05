package com.sogoodlabs.flashcardsapp.model.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class WordDefHint {

    @Id
    private String id;

    private String hint;

    @ManyToOne(fetch = FetchType.LAZY)
    private WordDef wordDef;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public WordDef getWordDef() {
        return wordDef;
    }

    public void setWordDef(WordDef wordDef) {
        this.wordDef = wordDef;
    }
}
