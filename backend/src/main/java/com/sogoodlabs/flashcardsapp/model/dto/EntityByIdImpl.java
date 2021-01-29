package com.sogoodlabs.flashcardsapp.model.dto;

import com.sogoodlabs.common_mapper.IEntityById;
import org.springframework.stereotype.Service;

@Service
public class EntityByIdImpl implements IEntityById<String> {


    @Override
    public Object get(String id, Class aClass) {
        if(id==null || aClass == null){
            return null;
        }
        Object result = null;


        if(result ==null){
            throw new NullPointerException("Entity not found; class: "+aClass.getName()+"; id: "+id);
        }

        return result;
    }
}
