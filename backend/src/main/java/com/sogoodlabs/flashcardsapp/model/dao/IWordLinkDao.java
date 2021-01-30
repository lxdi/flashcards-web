package com.sogoodlabs.flashcardsapp.model.dao;

import com.sogoodlabs.flashcardsapp.model.entities.Word;
import com.sogoodlabs.flashcardsapp.model.entities.WordLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IWordLinkDao extends JpaRepository<WordLink, String> {

    List<WordLink> findByWord(Word word);
}
