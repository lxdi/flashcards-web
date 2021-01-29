package com.sogoodlabs.flashcardsapp.model.dao;

import com.sogoodlabs.flashcardsapp.model.entities.Deck;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDeckDao extends JpaRepository<Deck, String> {
}
