package com.sogoodlabs.flashcardsapp.model.dao;

import com.sogoodlabs.flashcardsapp.model.entities.WordLink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IWordLinkDao extends JpaRepository<WordLink, String> {
}
