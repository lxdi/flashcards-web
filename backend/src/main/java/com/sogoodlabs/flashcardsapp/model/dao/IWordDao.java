package com.sogoodlabs.flashcardsapp.model.dao;

import com.sogoodlabs.flashcardsapp.model.entities.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IWordDao extends JpaRepository<Word, String> {
}
