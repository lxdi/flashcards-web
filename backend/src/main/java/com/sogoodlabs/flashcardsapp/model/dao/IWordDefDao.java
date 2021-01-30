package com.sogoodlabs.flashcardsapp.model.dao;

import com.sogoodlabs.flashcardsapp.model.entities.Word;
import com.sogoodlabs.flashcardsapp.model.entities.WordDef;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IWordDefDao extends JpaRepository<WordDef, String> {

    List<WordDef> findByWord(Word word);

}
