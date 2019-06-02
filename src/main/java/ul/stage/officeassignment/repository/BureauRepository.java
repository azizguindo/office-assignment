package ul.stage.officeassignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ul.stage.officeassignment.model.Bureau;

@Repository
public interface BureauRepository extends JpaRepository<Bureau,Long> {
    Bureau findByNumero(String numero);
}
