package com.sogoodlabs.flashcardsapp.model.entities;


import com.sogoodlabs.common_mapper.annotations.IncludeInDto;
import com.sogoodlabs.common_mapper.annotations.MapToClass;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.List;

@Entity
public class Deck {

    @Id
    private String id;

    private String title;

    @Transient
    private List<Word> words;

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

    @IncludeInDto
    public List<Word> getWords() {
        return words;
    }

    @MapToClass(value = Word.class)
    public void setWords(List<Word> words) {
        this.words = words;
    }
}
