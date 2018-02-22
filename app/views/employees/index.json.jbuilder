json.page @employees.current_page
json.total_pages @employees.total_pages

json.employees do
  json.array! @employees, partial: 'employee', as: :employee
end
