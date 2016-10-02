package weeklygrocery.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import weeklygrocery.beans.Plan;
import weeklygrocery.repositories.ItemRepo;
import weeklygrocery.repositories.PlanRepo;
import weeklygrocery.util.Util;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

	private PlanRepo planRepo;
	private ItemRepo itemRepo;

	public PlanController(PlanRepo planRepo, ItemRepo itemRepo) {
		super();
		this.planRepo = planRepo;
		this.itemRepo = itemRepo;
	}

	@GetMapping
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> getLast20Plans() {
		List<Plan> plans = planRepo.findFirst10ByUserIdOrderByIdDesc(Util.currentUser().get().getId());
		return ResponseEntity.ok(plans);
	}

	@PostMapping
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> addPlan(@RequestBody @Valid Plan plan) {
		plan.setUser(Util.currentUser().get());
		plan.getItems().forEach(i -> i.setPlan(plan));
		planRepo.save(plan);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> removePlan(@PathVariable("id") Long id) {
		planRepo.delete(id);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/items/{search}")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> getDistinctItemNames(@PathVariable("search") String search) {
		List<String> result = itemRepo.getAllDistinctNamesForCurrentUser(search);
		result.addAll(itemRepo.getAllDistinctNames(search));
		return ResponseEntity.ok(result);
	}

}
