package com.sogoodlabs.flashcardsapp.services;

import com.sogoodlabs.flashcardsapp.model.dao.IDeckDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordDefDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordLinkDao;
import com.sogoodlabs.flashcardsapp.model.entities.Deck;
import com.sogoodlabs.flashcardsapp.model.entities.Word;
import com.sogoodlabs.flashcardsapp.model.entities.WordDef;
import com.sogoodlabs.flashcardsapp.model.entities.WordLink;
import com.sogoodlabs.flashcardsapp.util.IdUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DeckModifyService {

    @Autowired
    private IDeckDao deckDao;

    @Autowired
    private IWordDao wordDao;

    @Autowired
    private IWordDefDao wordDefDao;

    @Autowired
    private IWordLinkDao wordLinkDao;

    public Deck modify(Deck deck){

        if(!IdUtils.isUUID(deck.getId())){
            deck.setId(UUID.randomUUID().toString());
        }

        deckDao.save(deck);

        if(deck.getWords()!=null) {
            deck.getWords().forEach(word -> modify(word, deck));
        }

        return deck;
    }

    private Word modify(Word word, Deck deck){
        if(!IdUtils.isUUID(word.getId())){
            word.setId(UUID.randomUUID().toString());
        }

        word.setDeck(deck);
        wordDao.save(word);

        if(word.getWordDefs()!=null){
            word.getWordDefs().forEach(wordDef -> modify(wordDef, word));
        }

        if(word.getWordLinks()!=null){
            word.getWordLinks().forEach(wordLink -> modify(wordLink, word));
        }

        return word;
    }

    private WordDef modify(WordDef wordDef, Word word){

        if(!IdUtils.isUUID(wordDef.getId())){
            wordDef.setId(UUID.randomUUID().toString());
        }

        wordDef.setWord(word);
        wordDefDao.save(wordDef);
        return wordDef;
    }

    private WordLink modify(WordLink wordLink, Word word){

        if(!IdUtils.isUUID(wordLink.getId())){
            wordLink.setId(UUID.randomUUID().toString());
        }

        wordLink.setWord(word);
        wordLinkDao.save(wordLink);
        return wordLink;
    }


}
