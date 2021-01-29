package com.sogoodlabs.flashcardsapp.model.dto;

import com.sogoodlabs.common_mapper.IEntityById;
import com.sogoodlabs.flashcardsapp.model.dao.IDeckDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordDefDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordLinkDao;
import com.sogoodlabs.flashcardsapp.model.entities.Deck;
import com.sogoodlabs.flashcardsapp.model.entities.Word;
import com.sogoodlabs.flashcardsapp.model.entities.WordDef;
import com.sogoodlabs.flashcardsapp.model.entities.WordLink;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntityByIdImpl implements IEntityById<String> {


    @Autowired
    private IDeckDao deckDao;

    @Autowired
    private IWordDao wordDao;

    @Autowired
    private IWordDefDao wordDefDao;

    @Autowired
    private IWordLinkDao wordLinkDao;

    @Override
    public Object get(String id, Class aClass) {
        if(id==null || aClass == null){
            return null;
        }
        Object result = null;

        if(aClass == Word.class){
            result = wordDao.findById(id).orElseThrow(()-> new RuntimeException(aClass.getName() + " not found by " + id));
        }

        if(aClass == WordDef.class){
            result = wordDefDao.findById(id).orElseThrow(()-> new RuntimeException(aClass.getName() + " not found by " + id));
        }

        if(aClass == WordLink.class){
            result = wordLinkDao.findById(id).orElseThrow(()-> new RuntimeException(aClass.getName() + " not found by " + id));
        }

        if(aClass == Deck.class){
            result = deckDao.findById(id).orElseThrow(()-> new RuntimeException(aClass.getName() + " not found by " + id));
        }

        if(result ==null){
            throw new NullPointerException("Entity not found; class: "+aClass.getName()+"; id: "+id);
        }

        return result;
    }
}
