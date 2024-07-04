import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

private void merge(Object target, Object source) throws Exception {
    // Map pour stocker les setters de la classe cible
    Map<String, Method> targetSetters = new HashMap<>();
    for (Method method : target.getClass().getMethods()) {
        if (method.getName().startsWith("set") && method.getParameterCount() == 1) {
            targetSetters.put(method.getName().substring(3).toLowerCase(), method);
        }
    }

    // Parcours des champs de la classe source
    for (Method method : source.getClass().getMethods()) {
        if (method.getName().startsWith("get") && method.getParameterCount() == 0) {
            String fieldName = method.getName().substring(3).toLowerCase();
            Object value = method.invoke(source);

            if (value != null && targetSetters.containsKey(fieldName)) {
                // Appel du setter correspondant dans la classe cible
                Method setter = targetSetters.get(fieldName);
                setter.invoke(target, value);
            }
        }
    }
}

