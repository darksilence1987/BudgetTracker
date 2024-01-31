package org.xhite.budget_tracker_back_end.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xhite.budget_tracker_back_end.dto.ExpenseDTO;
import org.xhite.budget_tracker_back_end.entities.Expense;
import org.xhite.budget_tracker_back_end.repository.ExpenseRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpensesController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping
    public Map<String, Map<String, List<ExpenseDTO>>> getMonthlyExpenses() {
        List<Expense> expenses = expenseRepository.findAll();

        // Use Java Streams to transform the list into the desired format
        return expenses.stream()
                .map(expense -> new ExpenseDTO(
                        expense.getId(),
                        expense.getTitle(),
                        expense.getCategory(),
                        expense.getAmount(),
                        expense.getDate()
                ))
                .collect(Collectors.groupingBy(
                        expenseDTO -> expenseDTO.getDate().format(DateTimeFormatter.ofPattern("yyyy")), // Group by year
                        Collectors.groupingBy(
                                expenseDTO -> expenseDTO.getDate().format(DateTimeFormatter.ofPattern("MMMM")), // Group by month
                                Collectors.toList()
                        )
                ));
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        try {
            Expense savedExpense = expenseRepository.save(expense);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedExpense);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody ExpenseDTO expenseDTO) {
        return expenseRepository.findById(id)
                .map(existingExpense -> {
                    existingExpense.setTitle(expenseDTO.getTitle());
                    existingExpense.setCategory(expenseDTO.getCategory());
                    existingExpense.setAmount(expenseDTO.getAmount());
                    existingExpense.setDate(expenseDTO.getDate());
                    Expense updatedExpense = expenseRepository.save(existingExpense);
                    return ResponseEntity.ok(updatedExpense);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        return expenseRepository.findById(id)
                .map(expense -> {
                    expenseRepository.delete(expense);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}