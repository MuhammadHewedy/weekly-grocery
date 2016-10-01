package weeklygrocery.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import weeklygrocery.beans.Item;

public interface ItemRepo extends PagingAndSortingRepository<Item, Long> {

	@Query("select distinct o.name from Item o where o.name like %:search%")
	List<Item> getAllDistinctNames(@Param("search") String search);
}
