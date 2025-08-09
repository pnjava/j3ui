#!/usr/bin/env python3
"""
Selenium UI tests for dbhds-tacts-ui
Tests critical UI elements and page rendering
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import sys
import time

def setup_driver():
    """Setup headless Chrome driver"""
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    
    driver = webdriver.Chrome(options=chrome_options)
    return driver

def test_landing_page():
    """Test that the landing page renders correctly"""
    driver = setup_driver()
    
    try:
        # Navigate to local server
        driver.get('http://localhost:8080')
        
        # Wait for page to load
        wait = WebDriverWait(driver, 10)
        
        # Check for DAP Dashboard text
        dashboard_element = wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'DAP Dashboard')]"))
        )
        
        print("✓ DAP Dashboard text found")
        
        # Check page title
        assert "DAP" in driver.title or driver.title != "", "Page title should contain DAP or not be empty"
        print("✓ Page title is valid")
        
        # Check that page loaded without errors
        logs = driver.get_log('browser')
        errors = [log for log in logs if log['level'] == 'SEVERE']
        
        if errors:
            print(f"⚠ Browser errors found: {errors}")
        else:
            print("✓ No severe browser errors")
        
        return True
        
    except Exception as e:
        print(f"✗ Test failed: {str(e)}")
        return False
        
    finally:
        driver.quit()

def test_ui_elements():
    """Test basic UI elements are present"""
    driver = setup_driver()
    
    try:
        driver.get('http://localhost:8080')
        wait = WebDriverWait(driver, 10)
        
        # Wait for any content to load
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        
        # Check for common UI elements
        body = driver.find_element(By.TAG_NAME, "body")
        assert body.text.strip() != "", "Page should have content"
        print("✓ Page has content")
        
        # Check for React root element or similar
        try:
            root_element = driver.find_element(By.ID, "root")
            print("✓ React root element found")
        except:
            # Try alternative selectors
            try:
                driver.find_element(By.TAG_NAME, "main")
                print("✓ Main content element found")
            except:
                print("⚠ No standard root element found, but page has content")
        
        return True
        
    except Exception as e:
        print(f"✗ UI elements test failed: {str(e)}")
        return False
        
    finally:
        driver.quit()

def main():
    """Run all tests"""
    print("Starting Selenium UI tests...")
    
    # Wait for server to be ready
    time.sleep(2)
    
    tests = [
        ("Landing Page Test", test_landing_page),
        ("UI Elements Test", test_ui_elements)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\nRunning {test_name}...")
        if test_func():
            passed += 1
            print(f"✓ {test_name} PASSED")
        else:
            print(f"✗ {test_name} FAILED")
    
    print(f"\nTest Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("All tests passed!")
        sys.exit(0)
    else:
        print("Some tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()