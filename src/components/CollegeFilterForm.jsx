import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Flex,
  useColorMode,
  IconButton,
  Text,
  Spinner,
  Checkbox
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import axios from 'axios';

const CollegeFilterForm = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [rank, setRank] = useState(localStorage.getItem('rank') || '');
  const [durationOptions] = useState(['4', '5']);
  const [seatTypeOptions] = useState(['OBC-NCL', 'OPEN', 'SC', 'ST']);
  const [genderOptions] = useState(['Male', 'Female']);
  const [selectedDuration, setSelectedDuration] = useState(localStorage.getItem('selectedDuration') || '');
  const [selectedSeatType, setSelectedSeatType] = useState(localStorage.getItem('selectedSeatType') || '');
  const [selectedGender, setSelectedGender] = useState(localStorage.getItem('selectedGender') || '');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [colleges, setColleges] = useState([]);
  const [pwdCheckbox, setPwdCheckbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    if (selectedDuration === '4') {
      setCourseOptions(['Btech', 'BS']);
    } else if (selectedDuration === '5') {
      setCourseOptions(['Btech+MBA', 'MS', 'Mtech']);
    } else {
      setCourseOptions([]);
    }
    setSelectedCourse(''); 
  }, [selectedDuration]);


  useEffect(() => {
    localStorage.setItem('rank', rank);
    localStorage.setItem('selectedDuration', selectedDuration);
    localStorage.setItem('selectedSeatType', selectedSeatType);
    localStorage.setItem('selectedGender', selectedGender);
  }, [rank, selectedDuration, selectedSeatType, selectedGender]);

  // useEffect(() => {
  //   const fetchOptions = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/api/filtered-options/');
  //       console.log(response);

  //       // setDurationOptions(response.data.durations);
  //       // setSeatTypeOptions(response.data.seat_types);
  //     } catch (error) {
  //       console.log('Failed to fetch options', error);
  //     }
  //   };

  //   fetchOptions();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setColleges([]);
    setError('');

    const gender = selectedGender.toLocaleLowerCase();
    const data = { rank, duration: selectedDuration, course: selectedCourse, seat_type: selectedSeatType, gender, pwd_checkbox: pwdCheckbox, };

    try {
      const response = await axios.post('http://localhost:8000/api/filtered-colleges/', data);
      console.log(response);

      if (response.data.length === 0) {
        throw new Error;
      } else {
        setColleges(response.data);
      }
    } catch (error) {
      console.log(error.response.data.msg);
      setError(error.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="98%" mx="auto" mt={10} p={5}>
      <Flex justifyContent="flex-end" mb={4}>
        <IconButton
          colorScheme="primary"
          aria-label="Toggle Theme"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} mb={5} display={{ base: 'block', md: 'none' }}>
          <FormControl isRequired>
            <FormLabel>Rank</FormLabel>
            <Input
              type="number"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="Enter your rank"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Duration</FormLabel>
            <Select
              placeholder="Select duration"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              {durationOptions.map((duration, index) => (
                <option key={index} value={duration}>
                  {duration}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Seat Type</FormLabel>
            <Select
              placeholder="Select seat type"
              value={selectedSeatType}
              onChange={(e) => setSelectedSeatType(e.target.value)}
            >
              {seatTypeOptions.map((seatType, index) => (
                <option key={index} value={seatType}>
                  {seatType}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Select gender"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              {genderOptions.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </Select>
          </FormControl>

        </VStack>

        <Flex display={{ base: 'none', md: 'flex' }} mb={5} gap={4}>
          <FormControl isRequired>
            <FormLabel>Rank</FormLabel>
            <Input
              type="number"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="Enter your rank"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Duration</FormLabel>
            <Select
              placeholder="Select duration"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              {durationOptions.map((duration, index) => (
                <option key={index} value={duration}>
                  {duration}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Seat Type</FormLabel>
            <Select
              placeholder="Select seat type"
              value={selectedSeatType}
              onChange={(e) => setSelectedSeatType(e.target.value)}
            >
              {seatTypeOptions.map((seatType, index) => (
                <option key={index} value={seatType}>
                  {seatType}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Select gender"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              {genderOptions.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>
        <Checkbox
          isChecked={pwdCheckbox}
          onChange={(e) => setPwdCheckbox(e.target.checked)}
        >
          Include (PwD) Seats
        </Checkbox>
        <FormControl isRequired mt={4}>

          <FormLabel>Course</FormLabel>
          {courseOptions.length > 0 ? (
            <Flex gap={2} warp="warp">
              {courseOptions.map((course, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="course"
                    value={course}
                    checked={selectedCourse === course}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  />
                  {course}
                </label>
              ))}
            </Flex>
          ) : (
            <Text>Select a duration first</Text>
          )}
        </FormControl>

        <Button type="submit" colorScheme="primary" width="full">
          Find College
        </Button>
      </form>

      {loading && (
        <Flex justifyContent="center" mt={10}>
          <Spinner size="xl" />
        </Flex>
      )}

      {!loading && error && (
        <Flex justifyContent="center" mt={10}>
          <Text color="red">{error}</Text>
        </Flex>
      )}
      {!loading && !error && colleges.length > 0 && (
        <Table style={{ marginTop: '20px' }}>
          <Thead>
            <Tr>
              <Th style={{ border: '1px solid', padding: '8px' }}>No</Th>
              <Th style={{ border: '1px solid', padding: '8px' }}>Institute Name</Th>
              <Th style={{ border: '1px solid', padding: '8px' }}>Program Name</Th>
              <Th style={{ border: '1px solid', padding: '8px' }}>Duration</Th>
              <Th style={{ border: '1px solid', padding: '8px' }}>Seat Type</Th>
              <Th style={{ border: '1px solid', padding: '8px' }}>Gender</Th>
              <Th style={{ border: '1px solid', padding: '8px' }}>Closing Rank</Th>
            </Tr>
          </Thead>
          <Tbody>
            {colleges.map((college, index) => (
              <Tr key={index}>
                <Td style={{ border: '1px solid ', padding: '8px' }}>{index + 1}</Td>
                <Td style={{ border: '1px solid ', padding: '8px' }}>{college.institute_name}</Td>
                <Td style={{ border: '1px solid ', padding: '8px' }}>{college.program_name}</Td>
                <Td style={{ border: '1px solid ', padding: '8px' }}>{college.duration}</Td>
                <Td style={{ border: '1px solid ', padding: '8px' }}>{college.seat_type}</Td>
                <Td style={{ border: '1px solid ', padding: '8px' }}>{college.gender}</Td>
                <Td style={{ border: '1px solid ', padding: '8px' }}>{college.closing_rank}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      )}
    </Box>
  );
};

export default CollegeFilterForm;
