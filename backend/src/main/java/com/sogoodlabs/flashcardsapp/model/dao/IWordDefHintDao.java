package com.sogoodlabs.flashcardsapp.model.dao;

import com.sogoodlabs.flashcardsapp.model.entities.WordDef;
import com.sogoodlabs.flashcardsapp.model.entities.WordDefHint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IWordDefHintDao extends JpaRepository<WordDefHint, String> {

    List<WordDefHint> findByWordDef(WordDef wordDef);
}
