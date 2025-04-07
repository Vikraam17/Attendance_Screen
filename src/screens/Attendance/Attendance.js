import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { format } from 'date-fns';

// Icons would be imported from a library like react-native-vector-icons
// This is a placeholder implementation for the example
const Icon = ({ name, size = 24, color = '#000' }) => (
  <Text style={{ fontSize: size, color }}>{name}</Text>
);

const AttendancePage = () => {
  // State for managing loading states
  const [isLoading, setIsLoading] = useState(false);
  const [savingData, setSavingData] = useState(false);
  
  // Current date state
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  
  // Employees and attendance data
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  
  // Departments for the filter
  const departments = ['All', 'Engineering', 'Marketing', 'HR', 'Finance', 'Operations'];

  // Fetch employees effect - simulated
  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Sample employee data - in a real app, this would come from an API
      setEmployees([
        { id: 1, name: 'John Doe', department: 'Engineering', role: 'Software Developer' },
        { id: 2, name: 'Jane Smith', department: 'Marketing', role: 'Marketing Specialist' },
        { id: 3, name: 'Robert Johnson', department: 'HR', role: 'HR Manager' },
        { id: 4, name: 'Emily Davis', department: 'Finance', role: 'Financial Analyst' },
        { id: 5, name: 'Michael Wilson', department: 'Operations', role: 'Operations Director' },
        { id: 6, name: 'Sarah Brown', department: 'Engineering', role: 'QA Engineer' },
        { id: 7, name: 'David Miller', department: 'Marketing', role: 'Content Strategist' },
        { id: 8, name: 'Lisa Anderson', department: 'HR', role: 'Recruiter' },
        { id: 9, name: 'James Taylor', department: 'Finance', role: 'Accountant' },
        { id: 10, name: 'Jennifer Thomas', department: 'Operations', role: 'Project Manager' },
      ]);
      setIsLoading(false);
    };
    
    fetchEmployees();
  }, []);

  // Initialize attendance data for today
  useEffect(() => {
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    if (!attendanceData[dateKey] && employees.length > 0) {
      const initialData = {};
      employees.forEach(employee => {
        initialData[employee.id] = null; // null = not marked, true = present, false = absent
      });
      setAttendanceData({
        ...attendanceData,
        [dateKey]: initialData
      });
    }
  }, [currentDate, employees]);

  // Change date handler
  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Mark attendance handler
  const markAttendance = (employeeId, status) => {
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    const updatedAttendance = {
      ...attendanceData,
      [dateKey]: {
        ...attendanceData[dateKey],
        [employeeId]: status
      }
    };
    setAttendanceData(updatedAttendance);
  };

  // Filter employees based on search query and department filter
  const filteredEmployees = employees.filter(employee => 
    (employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     employee.role.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (departmentFilter === 'All' || employee.department === departmentFilter)
  );

  // Get attendance status for an employee on current date
  const getAttendanceStatus = (employeeId) => {
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    if (attendanceData[dateKey] && attendanceData[dateKey][employeeId] !== null) {
      return attendanceData[dateKey][employeeId];
    }
    return null;
  };

  // Save attendance data
  const saveAttendance = async () => {
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    setSavingData(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would save to a database or API
    console.log('Attendance data saved:', attendanceData[dateKey]);
    
    setSavingData(false);
  };

  // Calculate attendance statistics
  const calculateStats = () => {
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    if (!attendanceData[dateKey]) return { present: 0, absent: 0, unmarked: employees.length };
    
    let present = 0, absent = 0, unmarked = 0;
    
    employees.forEach(emp => {
      const status = attendanceData[dateKey][emp.id];
      if (status === true) present++;
      else if (status === false) absent++;
      else unmarked++;
    });
    
    return { present, absent, unmarked };
  };

  const stats = calculateStats();

  // Helper function to render status indicator
  const renderStatusIndicator = (status) => {
    if (status === true) {
      return (
        <View style={styles.statusBadge}>
          <View style={[styles.statusIndicator, styles.presentIndicator]} />
          <Text style={styles.statusText}>Present</Text>
        </View>
      );
    } else if (status === false) {
      return (
        <View style={styles.statusBadge}>
          <View style={[styles.statusIndicator, styles.absentIndicator]} />
          <Text style={styles.statusText}>Absent</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.statusBadge}>
          <View style={[styles.statusIndicator, styles.unmarkedIndicator]} />
          <Text style={styles.statusText}>Unmarked</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1a237e" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Attendance Management</Text>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportButtonText}>Reports</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.dateSection}>
          <TouchableOpacity onPress={() => changeDate(-1)} style={styles.dateArrow}>
            <Icon name="←" size={18} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.dateDisplay}>
            <Text style={styles.currentDateText}>{format(currentDate, 'MMMM d, yyyy')}</Text>
            <Text style={styles.dayText}>{format(currentDate, 'EEEE')}</Text>
          </View>
          
          <TouchableOpacity onPress={() => changeDate(1)} style={styles.dateArrow}>
            <Icon name="→" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.presentCard]}>
          <Text style={styles.statNumber}>{stats.present}</Text>
          <Text style={styles.statLabel}>Present</Text>
          <View style={[styles.indicatorDot, styles.presentDot]} />
        </View>
        
        <View style={[styles.statCard, styles.absentCard]}>
          <Text style={styles.statNumber}>{stats.absent}</Text>
          <Text style={styles.statLabel}>Absent</Text>
          <View style={[styles.indicatorDot, styles.absentDot]} />
        </View>
        
        <View style={[styles.statCard, styles.unmarkedCard]}>
          <Text style={styles.statNumber}>{stats.unmarked}</Text>
          <Text style={styles.statLabel}>Unmarked</Text>
          <View style={[styles.indicatorDot, styles.unmarkedDot]} />
        </View>
      </View>
      
      {/* Legend for status indicators */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.presentDot]} />
          <Text style={styles.legendText}>Present</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.absentDot]} />
          <Text style={styles.legendText}>Absent</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.unmarkedDot]} />
          <Text style={styles.legendText}>Unmarked</Text>
        </View>
      </View>
      
      {/* Search and Filter */}
      <View style={styles.actionBar}>
        <View style={styles.searchContainer}>
          <Icon name="🔍" size={16} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search employees..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="×" size={16} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterScrollView}
          contentContainerStyle={styles.filterContainer}
        >
          {departments.map(dept => (
            <TouchableOpacity
              key={dept}
              style={[
                styles.filterChip,
                departmentFilter === dept ? styles.filterChipActive : null
              ]}
              onPress={() => setDepartmentFilter(dept)}
            >
              <Text 
                style={[
                  styles.filterChipText,
                  departmentFilter === dept ? styles.filterChipTextActive : null
                ]}
              >
                {dept}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Employee List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a237e" />
          <Text style={styles.loadingText}>Loading employee data...</Text>
        </View>
      ) : (
        <ScrollView style={styles.employeeList}>
          {filteredEmployees.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Icon name="📋" size={40} color="#ccc" />
              <Text style={styles.noResultsText}>No employees found</Text>
              <Text style={styles.noResultsSubText}>
                Try adjusting your search or filters
              </Text>
            </View>
          ) : (
            filteredEmployees.map(employee => {
              const attendanceStatus = getAttendanceStatus(employee.id);
              let cardStyle = styles.employeeCard;
              
              // Add color indicators based on attendance status
              if (attendanceStatus === true) {
                cardStyle = {...cardStyle, ...styles.presentEmployeeCard};
              } else if (attendanceStatus === false) {
                cardStyle = {...cardStyle, ...styles.absentEmployeeCard};
              } else {
                cardStyle = {...cardStyle, ...styles.unmarkedEmployeeCard};
              }
              
              return (
                <View key={employee.id} style={cardStyle}>
                  <View style={styles.employeeInfo}>
                    <Text style={styles.employeeName}>{employee.name}</Text>
                    <Text style={styles.employeeDetails}>
                      {employee.role} • {employee.department}
                    </Text>
                    {renderStatusIndicator(attendanceStatus)}
                  </View>
                  
                  <View style={styles.attendanceButtons}>
                    <TouchableOpacity
                      style={[
                        styles.attendanceButton,
                        styles.presentButton,
                        attendanceStatus === true ? styles.presentActive : null
                      ]}
                      onPress={() => markAttendance(employee.id, true)}
                    >
                      <Icon name="✓" size={16} color={attendanceStatus === true ? "#fff" : "#2e7d32"} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[
                        styles.attendanceButton,
                        styles.absentButton,
                        attendanceStatus === false ? styles.absentActive : null
                      ]}
                      onPress={() => markAttendance(employee.id, false)}
                    >
                      <Icon name="✗" size={16} color={attendanceStatus === false ? "#fff" : "#c62828"} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
          
          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
      
      {/* Save Button */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={saveAttendance}
          disabled={savingData}
        >
          {savingData ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Attendance</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#1a237e',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  reportButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  reportButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateArrow: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
  },
  dateDisplay: {
    alignItems: 'center',
  },
  currentDateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dayText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  presentCard: {
    borderTopColor: '#2e7d32',
    borderTopWidth: 3,
  },
  absentCard: {
    borderTopColor: '#c62828',
    borderTopWidth: 3,
  },
  unmarkedCard: {
    borderTopColor: '#f57c00',
    borderTopWidth: 3,
  },
  indicatorDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  presentDot: {
    backgroundColor: '#2e7d32',
  },
  absentDot: {
    backgroundColor: '#c62828',
  },
  unmarkedDot: {
    backgroundColor: '#f57c00',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color:"#808080",
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  actionBar: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  searchInput: {
    flex: 1,
    height: 44,
    marginLeft: 8,
    color: '#333',
  },
  filterScrollView: {
    flexGrow: 0,
  },
  filterContainer: {
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'white',
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterChipActive: {
    backgroundColor: '#e8eaf6',
    borderColor: '#3f51b5',
  },
  filterChipText: {
    color: '#666',
    fontSize: 14,
  },
  filterChipTextActive: {
    color: '#3f51b5',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  employeeList: {
    flex: 1,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginTop: 12,
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  employeeCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  presentEmployeeCard: {
    borderLeftColor: '#2e7d32',
    backgroundColor: 'rgba(46, 125, 50, 0.05)',
  },
  absentEmployeeCard: {
    borderLeftColor: '#c62828',
    backgroundColor: 'rgba(198, 40, 40, 0.05)',
  },
  unmarkedEmployeeCard: {
    borderLeftColor: '#f57c00',
    backgroundColor: 'rgba(245, 124, 0, 0.05)',
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  employeeDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  presentIndicator: {
    backgroundColor: '#2e7d32',
  },
  absentIndicator: {
    backgroundColor: '#c62828',
  },
  unmarkedIndicator: {
    backgroundColor: '#f57c00',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  attendanceButtons: {
    flexDirection: 'row',
  },
  attendanceButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
  },
  presentButton: {
    borderColor: '#2e7d32',
  },
  presentActive: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
  },
  absentButton: {
    borderColor: '#c62828',
  },
  absentActive: {
    backgroundColor: '#c62828',
    borderColor: '#c62828',
  },
  bottomSpacer: {
    height: 80,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  saveButton: {
    backgroundColor: '#1a237e',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AttendancePage;