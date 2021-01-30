package com.sogoodlabs.flashcardsapp.model.entities;

import com.sogoodlabs.common_mapper.annotations.IncludeInDto;
import com.sogoodlabs.common_mapper.annotations.MapToClass;

import javax.persistence.*;
import java.util.List;

@Entity
public class Word {

    @Id
    private String id;

    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    private Deck deck;

    @Transient
    private List<WordDef> wordDefs;

    @Transient
    private List<WordLink> wordLinks;


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

    public Deck getDeck() {
        return deck;
    }
    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    @IncludeInDto
    public List<WordDef> getWordDefs() {
        return wordDefs;
    }

    @MapToClass(value = WordDef.class)
    public void setWordDefs(List<WordDef> wordDefs) {
        this.wordDefs = wordDefs;
    }

    @IncludeInDto
    public List<WordLink> getWordLinks() {
        return wordLinks;
    }

    @MapToClass(value = WordLink.class)
    public void setWordLinks(List<WordLink> wordLinks) {
        this.wordLinks = wordLinks;
    }
}
