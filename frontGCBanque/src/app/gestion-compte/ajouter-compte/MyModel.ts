@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ademe implements Serializable {

private static final long serialVersionUID = 1L;

    private int total;
    private String next;
    private List<DpeAdeme> results;   
}

