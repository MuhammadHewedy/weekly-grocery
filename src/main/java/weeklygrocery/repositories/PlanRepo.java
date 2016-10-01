package weeklygrocery.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import weeklygrocery.beans.Plan;

public interface PlanRepo extends PagingAndSortingRepository<Plan, Long> {

	List<Plan> findFirst20ByUserIdOrderByIdDesc(Long userId);
}
