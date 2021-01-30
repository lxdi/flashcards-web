package com.sogoodlabs.flashcardsapp.model.dao;

import com.sogoodlabs.flashcardsapp.model.entities.Deck;
import com.sogoodlabs.flashcardsapp.model.entities.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IWordDao extends JpaRepository<Word, String> {

    List<Word> findByDeck(Deck deck);

}
