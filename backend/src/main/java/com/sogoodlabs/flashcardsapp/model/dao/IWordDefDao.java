package com.sogoodlabs.flashcardsapp.model.dao;

import com.sogoodlabs.flashcardsapp.model.entities.WordDef;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IWordDefDao extends JpaRepository<WordDef, String> {
}
