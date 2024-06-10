private void mergeList(Field field, Object target, Object source) throws Exception {
        List<?> sourceList = (List<?>) field.get(source);
        List<?> targetList = (List<?>) field.get(target);

        if (sourceList == null || sourceList.isEmpty()) {
            return;
        }

        if (targetList == null) {
            field.set(target, new ArrayList<>(sourceList));
            return;
        }

        for (Object sourceItem : sourceList) {
            Object sourceId = getId(sourceItem);
            Optional<?> targetItemOpt = targetList.stream()
                    .filter(item -> {
                        try {
                            return Objects.equals(getId(item), sourceId);
                        } catch (Exception e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .findFirst();

            if (targetItemOpt.isPresent()) {
                merge(targetItemOpt.get(), sourceItem);
            } else {
                targetList.add(sourceItem);
            }
        }
    }
 targetList.add(sourceItem);
Required type:
capture of ?
Provided:
Object
