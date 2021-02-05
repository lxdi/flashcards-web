package com.sogoodlabs.flashcardsapp.services;

import com.sogoodlabs.flashcardsapp.model.dao.*;
import com.sogoodlabs.flashcardsapp.model.entities.*;
import com.sogoodlabs.flashcardsapp.util.IdUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @Autowired
    private IWordDefHintDao wordDefHintDao;

    @Autowired
    private GracefulDeleteService gracefulDeleteService;

    public Deck modify(Deck deck){

        if(!IdUtils.isUUID(deck.getId())){
            deck.setId(UUID.randomUUID().toString());
        }

        deckDao.save(deck);

        if(deck.getWords()!=null) {
            Set<String> ids = deck.getWords().stream()
                    .peek(word -> modify(word, deck))
                    .map(Word::getId)
                    .collect(Collectors.toSet());

            wordDao.findByDeck(deck).stream()
                    .filter(word -> !ids.contains(word.getId()))
                    .forEach(gracefulDeleteService::delete);
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

            Set<String> ids = word.getWordDefs().stream()
                    .peek(wordDef -> modify(wordDef, word))
                    .map(WordDef::getId)
                    .collect(Collectors.toSet());

            wordDefDao.findByWord(word).stream()
                    .filter(wordDef -> !ids.contains(wordDef.getId()))
                    .forEach(gracefulDeleteService::delete);
        }

        if(word.getWordLinks()!=null){

            Set<String> ids = word.getWordLinks().stream()
                    .peek(wordLink -> modify(wordLink, word))
                    .map(WordLink::getId)
                    .collect(Collectors.toSet());

            wordLinkDao.findByWord(word).stream()
                    .filter(wordLink -> !ids.contains(wordLink.getId()))
                    .forEach(gracefulDeleteService::delete);
        }

        return word;
    }

    private WordDef modify(WordDef wordDef, Word word){

        if(!IdUtils.isUUID(wordDef.getId())){
            wordDef.setId(UUID.randomUUID().toString());
        }

        wordDef.setWord(word);
        wordDefDao.save(wordDef);

        if(wordDef.getHints()!=null){

            Set<String> ids = wordDef.getHints().stream()
                    .peek(wordDefHint -> modify(wordDefHint, wordDef))
                    .map(WordDefHint::getId)
                    .collect(Collectors.toSet());

            wordDefHintDao.findByWordDef(wordDef).stream()
                    .filter(wordLink -> !ids.contains(wordLink.getId()))
                    .forEach(gracefulDeleteService::delete);
        }

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

    private WordDefHint modify(WordDefHint wordDefHint, WordDef wordDef){

        if(!IdUtils.isUUID(wordDefHint.getId())){
            wordDefHint.setId(UUID.randomUUID().toString());
        }

        wordDefHint.setWordDef(wordDef);
        wordDefHintDao.save(wordDefHint);
        return wordDefHint;
    }


}
