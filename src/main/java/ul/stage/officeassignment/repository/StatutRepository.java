package ul.stage.officeassignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ul.stage.officeassignment.model.Statut;

@Repository
public interface StatutRepository extends JpaRepository<Statut, Long> {
}
