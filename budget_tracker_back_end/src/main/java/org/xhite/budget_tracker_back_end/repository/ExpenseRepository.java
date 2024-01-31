package org.xhite.budget_tracker_back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.xhite.budget_tracker_back_end.entities.Expense;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findAllByDateBetween(LocalDate startDate, LocalDate endDate);
}
