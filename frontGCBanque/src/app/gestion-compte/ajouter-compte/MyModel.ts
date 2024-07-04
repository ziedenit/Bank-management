private void merge(Object target, Object source) throws IllegalAccessException {
        Field[] fields = source.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            Object value = field.get(source);
            if (value != null) {
                field.set(target, value);
            }
        }
    }
refactor this methode ti fix smell code This accessibility update should be removed.  field.set(target, value) et     field.setAccessible(true);
