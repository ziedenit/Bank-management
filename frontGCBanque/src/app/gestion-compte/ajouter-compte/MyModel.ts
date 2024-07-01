import com.cl.msofd.dto.FinancementDto;
import com.cl.msofd.dto.GarantieDto;
import com.cl.msofd.exception.FinancementNotFoundException;
import com.cl.msofd.exception.GarantieNotFoundException;
import com.cl.msofd.exception.ListObjetNotFoundException;
import com.cl.msofd.model.*;
import com.cl.msofd.repository.FinancementRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class FinancementServiceTest {

    @Mock
    private FinancementRepository financementRepository;

    @Mock
    private IdGeneratorService idGeneratorService;

    @InjectMocks
    private FinancementService financementService;

    private Financement financement;
    private Garantie garantie;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        garantie = Garantie.builder()
                .idGarantie("GR51TLJ5G")
                .bien(Bien.builder().bienFinanceLCL(true).build())
                .build();

        ObjetFinancement objetFinancement = ObjetFinancement.builder()
                .idObjetFinancement("OBJ1")
                .garantie(Collections.singletonList(garantie))
                .build();

        financement = Financement.builder()
                .idFinancement("FR51TLJ5K")
                .objetFinancement(Collections.singletonList(objetFinancement))
                .build();
    }

    @Test
    void testCreateFinancement() {
        when(idGeneratorService.generateId("F")).thenReturn("FR51TLJ5K");
        when(idGeneratorService.generateId("O")).thenReturn("OBJ1");
        when(idGeneratorService.generateId("G")).thenReturn("GR51TLJ5G");
        when(financementRepository.save(any(Financement.class))).thenReturn(financement);

        Financement result = financementService.createFinancement(financement);

        assertNotNull(result);
        assertEquals("FR51TLJ5K", result.getIdFinancement());
        assertEquals("OBJ1", result.getObjetFinancement().get(0).getIdObjetFinancement());
        assertEquals("GR51TLJ5G", result.getObjetFinancement().get(0).getGarantie().get(0).getIdGarantie());
    }

    @Test
    void testGetFinancementByIdFinancement() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.of(financement));

        Financement result = financementService.getFinancementByIdFinancement("FR51TLJ5K");

        assertNotNull(result);
        assertEquals("FR51TLJ5K", result.getIdFinancement());
    }

    @Test
    void testGetFinancementByIdFinancementNotFound() {
        when(financementRepository.findByidFinancement("INVALID")).thenReturn(Optional.empty());

        assertThrows(FinancementNotFoundException.class, () -> {
            financementService.getFinancementByIdFinancement("INVALID");
        });
    }

    @Test
    void testDeleteFinancementByIdFinancement() {
        doNothing().when(financementRepository).deleteByIdFinancement("FR51TLJ5K");

        financementService.deleteFinancementByIdFinancement("FR51TLJ5K");

        verify(financementRepository, times(1)).deleteByIdFinancement("FR51TLJ5K");
    }

    @Test
    void testGetGarantie() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.of(financement));

        Garantie result = financementService.getGarantie("FR51TLJ5K", "GR51TLJ5G");

        assertNotNull(result);
        assertEquals("GR51TLJ5G", result.getIdGarantie());
    }

    @Test
    void testGetGarantieNotFound() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.of(financement));

        assertThrows(GarantieNotFoundException.class, () -> {
            financementService.getGarantie("FR51TLJ5K", "INVALID");
        });
    }

    @Test
    void testGetListObjectFinancementByIdFinancement() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.of(financement));

        List<ObjetFinancement> result = financementService.getListObjectFinancementByIdFinancement("FR51TLJ5K");

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals("OBJ1", result.get(0).getIdObjetFinancement());
    }

    @Test
    void testGetListObjectFinancementByIdFinancementNotFound() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.empty());

        assertThrows(ListObjetNotFoundException.class, () -> {
            financementService.getListObjectFinancementByIdFinancement("FR51TLJ5K");
        });
    }

    @AfterEach
    public void tearDown() {
        financement = null;
        garantie = null;
    }
}
