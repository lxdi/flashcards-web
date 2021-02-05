package com.sogoodlabs.flashcardsapp.model.entities;

import com.sogoodlabs.common_mapper.annotations.IncludeInDto;
import com.sogoodlabs.common_mapper.annotations.MapToClass;

import javax.persistence.*;
import java.util.List;

@Entity
public class WordDef {

    @Id
    private String id;

    private String definition;

    @ManyToOne(fetch = FetchType.LAZY)
    private Word word;

    @Transient
    private List<WordDefHint> hints;

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

    @IncludeInDto
    public List<WordDefHint> getHints() {
        return hints;
    }

    @MapToClass(value = WordDefHint.class)
    public void setHints(List<WordDefHint> hints) {
        this.hints = hints;
    }
}
